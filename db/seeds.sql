INSERT INTO department (name)
VALUES 
('Software Engineer'), 
('Sales'), 
('Finance'),
('Legal');

INSERT INTO role (title, salary, department_id)
VALUES 
('Senior Software Engineer', 140000, 1),
('Director of Sales', 150000, 2),
('Chief Financial Officer', 250000, 3),
('Corporate Lawyer', 160000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES 
('Adrian', 'Mora', 1, 4),
('John', 'MILLER', 2, 3),
('Victoria', 'Mora', 3, 2),
('Claudia', 'Diaz', 4, 1);