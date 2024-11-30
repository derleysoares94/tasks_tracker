from datetime import datetime, timedelta
from sqlalchemy import func
from flask import Flask, flash, render_template, redirect, request, url_for

from models import Task, db

app = Flask(__name__)
app.config.from_object('config')

with app.app_context():
    db.init_app(app)
    db.create_all()
    
@app.route('/',  methods=['GET'])
def index():
    today_tasks = Task.query.filter(func.date(Task.due_date) == datetime.today().date()).all()
    today_tasks_done = Task.query.filter(Task.status == 3, func.date(Task.due_date) == datetime.today().date()).all()
    
    teste = {
        "today_tasks": len(today_tasks),
        "today_tasks_done": len(today_tasks_done),
        "quantity_done": '{0:.2f}'.format(len(today_tasks_done)/len(today_tasks)*100)
    }
    
    today = datetime.now().date()
    
    start_of_week = today - timedelta(days=today.weekday())
    
    end_of_week = start_of_week + timedelta(days=6)
    
    week_tasks = Task.query.filter(func.date(Task.due_date) >= start_of_week, func.date(Task.due_date) <= end_of_week).all()
    week_tasks_done = Task.query.filter(Task.status == 3, func.date(Task.due_date) >= start_of_week, func.date(Task.due_date) <= end_of_week).all()
    
    week_tasks = {
        "week_tasks": len(week_tasks),
        "week_tasks_done": len(week_tasks_done),
        "quantity_done": '{0:.2f}'.format(len(week_tasks_done)/len(week_tasks)*100)
    }
    return render_template('index.html', today_tasks=teste, week_tasks=week_tasks)

@app.route('/tasks')
def tasks():
    page = request.args.get('page', 1, type=int)
    per_page = 5
    pagination = Task.query.paginate(page=page, per_page=per_page, error_out=False)
    tasks = pagination.items
    return render_template('tasks.html', tasks=tasks, pagination=pagination)

@app.route('/create_task', methods=['GET','POST'])
def create_task():
    if request.method == 'POST':
        title = request.form['title']
        description = request.form['description']
        status = int(request.form['status'])
        due_date = datetime.strptime(request.form['due_date'], '%Y-%m-%d')
        
        task = Task(
            title=title,
            description=description,
            status=status,
            due_date=due_date
        )
        db.session.add(task)
        db.session.commit()
        return redirect(url_for('index'))
    
    return render_template('create_task.html')

@app.route('/edit_task/<int:task_id>', methods=['POST'])
def edit_task(task_id):
    task = Task.query.get_or_404(task_id)
    task.title = request.form['title']
    task.description = request.form['description']
    task.status = int(request.form['status'])
    task.due_date = datetime.strptime(request.form['due_date'], '%Y-%m-%d')
    db.session.commit()
    return redirect(url_for('tasks'))

@app.route('/delete_task/<int:task_id>', methods=['POST'])
def delete_task(task_id):
    task = Task.query.get_or_404(task_id)
    db.session.delete(task)
    db.session.commit()
    return redirect(url_for('tasks'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=4000)