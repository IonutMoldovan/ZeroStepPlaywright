# ZeroStepPlaywright

This project uses the ZeroStep library to create maintenance-free automated tests.

## Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/ZeroStepPlaywright.git
    cd ZeroStepPlaywright
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create the [zerostep.config.json](http://_vscodecontentref_/2) file in the root of the project with your ZeroStep : this file is personal and i will not commit it , so you need to create youre onw account with youre token .

token    ```json
    {
      "TOKEN": "your-zerostep-token",
      "LOGS_ENABLED": true
    }
    ```

### Running Tests

To run the tests, use the following command:

```sh
npm test