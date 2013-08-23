#!/usr/bin/env ruby

require 'commander/import'
require 'fileutils'

program :name, 'Evenly Web Deploy Tools'
program :version, '0.0.1'
program :description, 'Deploy tools for evenly-web project'

@github_url = 'git@github.com:ev3nly/ev3nly.github.io.git'

command :deploy do |c|
  c.summary = 'build distribution and push to github.io'
  c.action do |args, options|

    if not File.exists?(current_path + '/ev3nly.github.io/.git')
      speak_and_say "\ncloning github pages url"
      `git clone #{@github_url}`
      say "cloning complete"
    end

    speak_and_say "\nbuilding distribution files"
    puts `grunt build --force`
    say "build complete"

    say "\nmoving distribution files to github.io repo"
    Dir.glob(File.join(File.expand_path("./dist"), '*')).each do |file|
      if File.exists?(file)
        FileUtils.cp_r(file, "ev3nly.github.io/#{File.basename(file)}", verbose: true)
      end
    end

    say 'commiting files'
    Dir.chdir 'ev3nly.github.io'
    `git add .`
    `git commit . -m 'Rebuilding dist'`
    `git push`

    say "\nmigrating campaign from folder style to file style in /dist"
    Dir.chdir '..'
    `./eve.rb migrate campaign`

    say "\nev3nly.github.io has been pushed"
    say "/dist contains a distribution for production"

    speak_and_say "\nOkay, I am done now Sean, get back to work\n"
  end
end

command :migrate do |c|
  c.summary = "migrate campaigns in /dist from folder style to file style"
  c.action do |args, options|
    if args.first != "campaign"
      say "\nmigrate only recognizes 'campaign' as an argument" 
    else
      say "\n"
      Dir.foreach("dist") do |file|
        next if file == '.' or file =='..'
        if File.directory?("dist/#{file}") and File.exists?("dist/#{file}/meta")
          say "deleting dist/#{file}"
          FileUtils.rm_rf("dist/#{file}")
        end
      end

      say "\n"
      Dir.foreach("app") do |file|
        next if file == '.' or file == '..'

        if File.directory?("app/#{file}") and File.exists?("app/#{file}/meta")
          puts "Copying app/#{file}/index.html to dist/#{file}"
          FileUtils.cp("app/#{file}/index.html", "dist/#{file}")
        end
      end
    end
  end
end

command :campaign do |c|
  c.summary = 'create another campaign for evenly.com'
  c.action do |args, options|
    @campaign_code = args.first
    
    if @campaign_code.nil?
      puts 'Enter a Campaign Code'
    else
      begin
        # Make a /unc directory if we have to
        FileUtils.mkdir("app/#{@campaign_code}")
      rescue
      end

      campaign_path = "app/#{@campaign_code}"
      
      # Copy campaign-template/index.html to unc/index.html
      # Replace 'CAMPAIGN_CODE' with unc
      FileUtils.cp("app/campaign-template/index.html", "#{campaign_path}/index.html", verbose: true)
      text = File.read("#{campaign_path}/index.html").gsub(/CAMPAIGN_CODE/, @campaign_code)
      File.open("#{campaign_path}/index.html", 'w') { |file| file.write text }
      
      # Writing meta file
      File.open("#{campaign_path}/meta", 'w') { |file| file.write("CAMPAIGN_CODE = #{@campaign_code}") }
    end
  end
end

def current_path
  File.expand_path("..", __FILE__)
end

def speak_and_say(words)
  speak words
  say words
end