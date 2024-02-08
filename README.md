# NodeJS File Manager

This Node.js-based File Manager allows users to perform various file operations, navigate through directories, and obtain information about the host machine's operating system. The program utilizes Node.js APIs, Streams API, and Brotli algorithm for compression and decompression.

## Getting Started

To run the File Manager, make sure you have Node.js version 20 installed. Follow the steps below:

1. Clone the repository: `git clone https://github.com/IrinaOsp/NodeJS_file-manager.git`
2. Navigate to the project directory: `cd file-manager`
3. Install dependencies: `npm install`
4. Start the program: `npm run start -- --username=your_username`

Replace `your_username` with your username.

Upon starting the program, you will see the welcome message and the current working directory. The program prompts for commands and waits for user input.

**Use folders without spaces! If path to your folder contains spaces replace them with \_ or - or use quotes for path**

## Available Commands

### Navigation & Working Directory

- **Go up one level:** `up`
- **Go to a specific directory:** `cd path_to_directory`
- **List files and folders in the current directory:** `ls`

### Basic File Operations

- **Read file and print content:** `cat path_to_file`
- **Create an empty file:** `add new_file_name`
- **Rename file:** `rn path_to_file new_filename`
- **Copy file:** `cp path_to_file path_to_new_directory`
- **Move file (and delete original):** `mv path_to_file path_to_new_directory`
- **Delete file:** `rm path_to_file`

### Operating System Info

- **Get EOL (End-Of-Line):** `os --EOL`
- **Get CPU information:** `os --cpus`
- **Get home directory:** `os --homedir`
- **Get system user name:** `os --username`
- **Get CPU architecture:** `os --architecture`

### Hash Calculation

- **Calculate hash for a file:** `hash path_to_file`

### Compression & Decompression

- **Compress file using Brotli algorithm:** `compress path_to_file path_to_destination`
- **Decompress file using Brotli algorithm:** `decompress path_to_file path_to_destination`

## Exiting the Program

To exit the File Manager, press `Ctrl + C` or enter the `.exit` command. You will see a farewell message acknowledging the username.

## Notes

- Invalid commands or input will prompt an "Invalid input" message.
- Errors during execution will result in an "Operation failed" message.
- Attempting to navigate above the root directory won't change the current working directory.
