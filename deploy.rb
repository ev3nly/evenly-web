#!/usr/bin/env ruby

require 'commander/import'
require 'fileutils'

program :name, 'Evenly Web Deploy Tools'
program :version, '0.0.1'
program :description, 'Deploy tools for evenly-web project'

@github_url = 'git@github.com:ev3nly/ev3nly.github.io.git'

command :github do |c|
  c.summary = 'build distribution and push to github.io'
  c.action do |args, options|

    if not File.exists?(current_path + '/ev3nly.github.io/.git')
      speak_and_say 'cloning github pages url'
      `git clone #{@github_url}`
      say 'cloning complete'
    end

    speak_and_say 'building distribution files'
    `grunt build --force`
    say 'build complete'

    # say 'deleting all files in github.io repo'

    # Dir.foreach('ev3nly.github.io') do |file|
    #   if file != '.' and file != '..'
    #     puts file
    #   end
    # end
    
    # speak_and_say 'moving distribution files to github.io repo'

    Dir.glob(File.join(File.expand_path("./dist"), '*')).each do |file|
      if File.exists?(file)
        FileUtils.cp_r(file, "ev3nly.github.io/#{File.basename(file)}", verbose: true)
      end
    end

    Dir.chdir 'ev3nly.github.io'

    # speak_and_say 'commiting files'
    `git add .`
    `git commit . -m 'Rebuilding dist'`
    `git push`

    speak_and_say 'Okay, I am done now Sean, get back to work'
  end
end

def current_path
  File.expand_path("..", __FILE__)
end

def speak_and_say(words)
  speak words
  say words
end