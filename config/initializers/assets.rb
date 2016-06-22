# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )
Rails.application.config.assets.precompile << Proc.new do |path|
  if path =~ /\.(css|js|scss)\z/
    full_path = Rails.application.assets.resolve(path).to_s
    app_assets_path = Rails.root.join('app', 'assets').to_s
    if full_path.starts_with? app_assets_path.to_s
      Rails.logger.info 'including asset: ' + full_path
      true
    else
      Rails.logger.info 'excluding asset: ' + full_path
      false
    end
  else
    false
  end
end
