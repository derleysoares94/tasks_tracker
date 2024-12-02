/*
Using SweetAlert library to show an confirm alert when the user tries to delete a task,
asking: Are you sure?. You won't be able to revert this!.
*/
document.addEventListener('DOMContentLoaded', function () {
    const deleteForms = document.querySelectorAll('form.delete-form');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    form.submit();
                }
            });
        });
    });
});

/*
Using SweetAlert library to show an edit modal form when the user clicks on edit a task.
*/
function editTask(taskId, title, description, status, dueDate) {
    Swal.fire({
        title: 'Edit Task',
        //create the input fields with the current values of the task on the edit modal form.
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Title" value="${title}">
            <input id="swal-input2" class="swal2-input" placeholder="Description" value="${description}">
            <select id="swal-input3" class="swal2-input" value="${status}">
                <option value="1">To Do</option>
                <option value="2">Doing</option>
                <option value="3">Done</option>
            </select>
            <input id="swal-input4" class="swal2-input" placeholder="Due Date" type="date" value="${dueDate.split(' ')[0]}">
        `
        ,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Edit',
        // Set the values of the select field.
        didOpen: () => {
            document.getElementById('swal-input3').value = status;
        },
        preConfirm: () => {
            const newTitle = document.getElementById('swal-input1').value;
            const newDescription = document.getElementById('swal-input2').value;
            const newStatus = document.getElementById('swal-input3').value;
            const newDueDate = document.getElementById('swal-input4').value;
            // Validate the inputs are not empty.
            if (!newTitle || !newDescription || !newStatus || !newDueDate) {
                Swal.showValidationMessage('All fields are required');
                return false;
            }

            return { newTitle, newDescription, newStatus, newDueDate };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/edit_task/${taskId}`;
            form.style.display = 'none';

            const titleInput = document.createElement('input');
            titleInput.name = 'title';
            titleInput.value = result.value.newTitle;
            form.appendChild(titleInput);

            const descriptionInput = document.createElement('input');
            descriptionInput.name = 'description';
            descriptionInput.value = result.value.newDescription;
            form.appendChild(descriptionInput);

            const statusInput = document.createElement('input');
            statusInput.name = 'status';
            statusInput.value = result.value.newStatus;
            form.appendChild(statusInput);

            const dueDateInput = document.createElement('input');
            dueDateInput.name = 'due_date';
            dueDateInput.value = result.value.newDueDate;
            form.appendChild(dueDateInput);

            document.body.appendChild(form);
            form.submit();
        }
    });
}

/*
Close the nav menu when clicking outside of it.
*/
document.addEventListener('click', function (event) {
    var navbar = document.getElementById('navbarNav');
    var navbarToggler = document.querySelector('.navbar-toggler');

    if (!navbar.contains(event.target) && !navbarToggler.contains(event.target)) {
        var bsCollapse = new bootstrap.Collapse(navbar, {
            toggle: false
        });
        bsCollapse.hide();
    }
});