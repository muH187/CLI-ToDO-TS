#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let addTask = await inquirer.prompt([
        {
            name: "todo",
            message: "What do you want to add? ",
            type: "input"
        },
        {
            name: "addMore",
            message: "Do you want to add more? ",
            type: "confirm",
            default: "false"
        }
    ]);
    todos.push(addTask.todo);
    condition = addTask.addMore;
    console.log("Your current Tasks:", todos);
}
let userExit = await inquirer.prompt([
    {
        name: "exit",
        message: "Do you want to exit or delete an item? ",
        type: "list",
        choices: ["Exit", "Delete"]
    }
]);
if (userExit.exit == "Delete") {
    let deleteTask = await inquirer.prompt([
        {
            name: "delete",
            message: `Enter the index of the task you want to delete 0-${todos.length - 1}`,
            type: "number",
            validate: (input) => {
                if (isNaN(input) || input < 0 || input >= todos.length) {
                    return "Please enter valid index.";
                }
                return true;
            }
        }
    ]);
    todos.splice(deleteTask.delete, 1);
    console.log("Your updated task", todos);
}
else if (userExit.exit == "Exit") {
    console.log("Your current Tasks:", todos);
}
