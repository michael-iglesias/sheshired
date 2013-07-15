require 'rubygems'
require 'sinatra'
require 'data_mapper'
require 'dm-postgres-adapter'
require 'omniauth-linkedin'
require 'omniauth-facebook'
require 'json'


DataMapper::setup(:default, ENV['DATABASE_URL'])

class User  
  include DataMapper::Resource  
  property :id, Serial  
  property :first_name, Text, :required => true  
  property :last_name, Text, :required => true
  property :email, Text, :required => true
  property :headline, Text, :required => false
  property :industry, Text, :required => false
  property :picture_url, Text, :required => false
  property :linkedin_url, Text, :required => false
  property :created_at, DateTime  
  property :updated_at, DateTime
  
  has n, :educations, :positions 
end

class Education
	include DataMapper::Resource
	property :id, Serial
	property :school_name, Text, :required => true
	property :field_of_study, Text, :required => false
	property :graduation_date, Text, :required => false
	property :created_at, DateTime  
	property :updated_at, DateTime
	
	belongs_to :user
end

class Position
	include DataMapper::Resource
	property :id, Serial
	property :company_name, Text, :required => true
	property :summary, Text, :required => false
	property :is_current, Boolean, :required => false, :default => false
	property :start_date, Text, :required => false
	property :end_date, Text, :required => false
	property :created_at, DateTime  
	property :updated_at, DateTime
	
	belongs_to :user
end

DataMapper.finalize.auto_upgrade!


# Configuration settings
enable :sessions

get '/' do
	@title = "Shes Hired!"
	haml :index
end

get '/home' do
	@title = "She's Hired!"
	haml :home
end

get '/talent' do
	@title = "She's Hired!"
	haml :talent
end

get '/employers' do
	@title = "She's Hired!"
	haml :employer
end




# ************************************************
# Login/Registration routes
# ************************************************
get '/register' do
	@title = "She's Hired! Registration"
	haml :register
end



get '/logout' do
	session.clear
	redirect '/'
end

# ************************************************
# Talent user routes
# ************************************************
get '/user' do
	
	"#{session[:user_id]}"
	
end






# ************************************************
# Oauth using Omniauth methods
# ************************************************
# Oauth method
ENV['LINKEDIN_CONSUMER_KEY'] = "obd2hbx5vz53"
ENV['LINKEDIN_CONSUMER_SECRET'] = "0VrCxY3XWvJw1Eiy"

%w(get post).each do |method|
	send(method, "/auth/:provider/callback") do
		resp =  (request.env['omniauth.auth']).extra.raw_info.to_hash

		value = []
		resp['positions']['values'].each do |c|
			value << c['id']
		end

		"<pre>" + value.join(",") + "</pre>" + resp["lastName"]
		
		# New users will be registered and profile info will be captured
		registered = User.count(:email => resp["emailAddress"])
		
		if registered > 0
			talent = User.first(:email => resp["emailAddress"])
			
			YAML::dump(talent)
			session[:user_id] = talent.id
			session[:user_type] = 'talent'
			redirect '/user'
		else
			# Create new record in User table
			u = User.new
			u.first_name = resp["firstName"]
			u.last_name = resp["lastName"]
			u.email = resp["emailAddress"]
			u.headline = resp["headline"]
			u.industry = resp["industry"]
			u.picture_url = resp["pictureUrl"]
			u.linkedin_url = resp["publicProfileUrl"]
			
			new_user = u.save
			
			# Iterate through education and insert into Education table
			resp['educations']['values'].each do |edu|
				e = Education.new
				e.school_name = edu["schoolName"]
				e.field_of_study = edu["fieldOfStudy"]
				e.graduation_date = edu["endDate"]["year"]
				e.user_id = u.id
				
				e.save
			end
			
			# Iterate through positions and insert into Position Table
			resp['positions']['values'].each do |pos|
				p = Position.new
				p.company_name = pos["company"]["name"]
				p.summary = pos["summary"]
				p.is_current = pos["isCurrent"]
				p.user_id = u.id
	
				if pos.has_key?("startDate")
					month = pos["startDate"]["month"].to_i
					year = pos["startDate"]["year"].to_i
					startDate = month.to_s + "/" + year.to_s
					p.start_date = startDate
				end
				
				if pos.has_key?("endDate")
					month = pos["endDate"]["month"].to_i
					year = pos["endDate"]["year"].to_i
					endDate = month.to_s + "/" + year.to_s
					p.end_date = endDate
				end
	
				p.save
			end
			# Set session data and redirect to User Dashboard
			session[:user_id] = u.id
			session[:user_type] = 'talent'
			
			redirect '/'
		end
		
	end
end

get '/auth/linkedin/callback/cancel' do
    redirect '/'
end

get '/auth/failure' do
  flash[:notice] = params[:message] # if using sinatra-flash or rack-flash
  redirect '/'
end

use OmniAuth::Builder do
  provider :linkedin, ENV['LINKEDIN_CONSUMER_KEY'], ENV['LINKEDIN_CONSUMER_SECRET'], :scope => 'r_fullprofile+r_emailaddress+r_network', :fields => ["id", "email-address", "first-name", "last-name", "headline", "industry", "picture-url", "public-profile-url", "location", "positions", "educations"]
  
  provider :facebook, '571477582902573', '8fa5f4f4ef8cc4b7cbbf365e6c55394c'
end