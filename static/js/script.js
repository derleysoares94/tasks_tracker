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

function editTask(taskId, title, description, status, dueDate) {
    Swal.fire({
        title: 'Edit Task',
        html: `
            <input id="swal-input1" class="swal2-input" placeholder="Title" value="${title}">
            <input id="swal-input2" class="swal2-input" placeholder="Description" value="${description}">
            <input id="swal-input3" class="swal2-input" placeholder="Status" type="number" value="${status}">
            <input id="swal-input4" class="swal2-input" placeholder="Due Date" type="date" value="${dueDate.split(' ')[0]}">
        `,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            const newTitle = document.getElementById('swal-input1').value;
            const newDescription = document.getElementById('swal-input2').value;
            const newStatus = document.getElementById('swal-input3').value;
            const newDueDate = document.getElementById('swal-input4').value;
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