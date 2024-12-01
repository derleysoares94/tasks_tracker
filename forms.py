from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, DateField
from wtforms.validators import InputRequired, Length

class TaskForm(FlaskForm):
    title = StringField('Title', [InputRequired(message='The input title must be filled.'), Length(max=100)], render_kw={"placeholder": "Enter the title"})
    description = TextAreaField('Description', [InputRequired(message='The input description must be filled.'), Length(max=200)], render_kw={"placeholder": "Enter the description"})
    status = SelectField('Status', choices=[('', 'Select the status'), ('1', 'To Do'), ('2', 'Doing'), ('3', 'Done')], validators=[InputRequired(message='Please select one status.')])
    due_date = DateField('Due Date', format='%Y-%m-%d', validators=[InputRequired(message='Please select a valide date.')])