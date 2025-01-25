from flask import Flask

def create_app():
    app = Flask(__name__)
    
    # Load configuration
    app.config.from_mapping(
        SECRET_KEY="your-secret-key",
        DATABASE_URI="sqlite:///app.db"
    )
    
    # Register blueprints or routes
    from .routes import bp as routes_bp
    app.register_blueprint(routes_bp)
    
    return app
