namespace :generate do

  desc "generates scss files"  
  task :scss do
    system <<-SCRIPT
      rm tmp/*.css
      cp public/stylesheets/*.css tmp/
      sass views/css3.scss tmp/css3.css
      sass views/layout.scss tmp/layout.css
      sass views/style.scss tmp/style.css
    SCRIPT
  end
  
  desc "generates assets files"  
  task :assets => :scss do
    system "rm -r public/assets/"
    require 'jammit'
    Jammit.package!
  end
  
end

namespace :images do
  desc "crushes all PNGs in public/images"
  task :crush do
    require 'find'

    sum = []

    images_dir = File.expand_path('public/images')
    Find.find(images_dir) do |file|
      next unless file.match('\.png$')

      # crush
      crushed_file = "#{file}.crushed"
      command = <<-CMD
        pngcrush -reduce -brute -no_cc -q "#{file}" "#{crushed_file}"
      CMD
      system command.strip

      # check
      next unless File.exists?(crushed_file)
      crushed_size = File.size(file) - File.size(crushed_file)
      unless crushed_size > 0
        system "rm \"#{crushed_file}\""
        next
      end

      system "mv \"#{crushed_file}\" \"#{file}\""
      sum << crushed_size
      puts "CRUSHED #{crushed_size}: #{file}"
    end

    puts "TOTAL: #{sum.inject(0){|s,i|s+i}} bytes of #{sum.size} files"
  end
end

desc "deploys to heroku, after generating production assets"  
task :deploy => "generate:assets" do
  system "git push heroku master"
end