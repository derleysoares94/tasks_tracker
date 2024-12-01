from datetime import datetime

from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text

db = SQLAlchemy()

class Task(db.Model):
    id = db.mapped_column(db.Integer, primary_key=True)
    title = db.mapped_column(db.String(80), nullable=False)
    description = db.mapped_column(db.String(120), nullable=False)
    status = db.mapped_column(db.Integer, nullable=False)
    due_date = db.mapped_column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    def __repr__(self):
        return f'<Task {self.title}>'