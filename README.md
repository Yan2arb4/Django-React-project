This is a project I am currently working on using React, Django, and TypeScript to enhance my learning experience.

The script `init_django_react_project.sh` found in the root is used to generate a basic empty project on the go.

## Requirements
You need to have the following downloaded:
- [Python](https://www.python.org/downloads/)
- [Node.js](https://nodejs.org/en/download/package-manager)
- [VSCode](https://code.visualstudio.com/download)

Make sure to install the following extensions in VSCode:
- Django
- React

## Using the `init_django_react_project.sh` script:

1. Make sure you have an empty directory where you want to create your project.

2. Open a git bash terminal and navigate to the directory where you want to create the project.

3. Run the following command:
```bash
. /path/to/script/init_django_react_project.sh <project_name> <project_path>
```
Replace `<project_name>` with the desired name for your project and `<project_path>` with the desired path for your project.

4. Wait for the script to complete. It will create the project directory, activate a virtual environment, download and install the required dependencies, create the Django project and apps, set up the frontend, and perform other necessary configurations.

5. Once the script finishes successfully, you will see the message "Project setup completed successfully."

6. You can now start working on your Django React project.

Remember to replace `<project_name>` and `<project_path>` with your own values.

## Initializing the project without the `init_django_react_project.sh` script:

1. Make sure you have an empty directory where you want to create your project.

2. Open a terminal and navigate to the directory where you want to create the project.

3. Run the following command in Git Bash to create a virtual environment:
```bash
python -m venv .venv
```
This command creates a virtual environment named `.venv` in your project directory.

4. Activate the virtual environment by running the following command:
```bash
. .venv/Scripts/activate
```
This command activates the virtual environment and ensures that the Python dependencies are installed in the virtual environment instead of the global Python environment.

5. Install the required Python dependencies by running the following command:
```bash
pip install -r requirements.txt
```

6. Navigate to the folder where package.json is located and install the required JavaScript dependencies by running the following command:
```bash
npm install
```

7. Once the dependencies are installed, you can start working on your Django React project.

Remember to replace `<project_name>` and `<project_path>` with your own values.

## How to run the project
Before running the project, ensure you have completed the setup steps mentioned above.

1. Apply Migrations:

```bash
python manage.py migrate
```
This command applies any pending migrations to your database.

2. Run the Django Server:

```bash
python manage.py runserver
```
This starts the Django development server. The output will give a url you can open.

3. Run the Frontend Development Server:
Navigate to the frontend directory of your project where package.json is located.

```bash
npm run dev
```
This command starts the frontend development server.

## Credits

[TechWithTim](https://www.youtube.com/@TechWithTim) for the project.
