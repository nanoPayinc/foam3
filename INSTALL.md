# Installation
## Linux / Chromebook
Install java, nodejs and maven, if required. On Linux, you can do this with:

    sudo apt-get install default-jdk
    sudo apt-get install maven
    sudo apt-get install nodejs

## MacOS
Install java, nodejs, brew, nvm and maven, if required.

Install Brew (with directions from [https://brew.sh/](https://brew.sh/)):

    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    echo >> /Users/kevingreer/.zprofile
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/kevingreer/.zprofile
    eval "$(/opt/homebrew/bin/brew shellenv)"

Install the Node Version Manager (NVM):

    brew upgrade
    brew install nvm
    echo 'export NVM_DIR="$HOME/.nvm"' >> ~/.zshrc
    echo '[ -s "$(brew --prefix nvm)/nvm.sh" ] && \. "$(brew --prefix nvm)/nvm.sh"' >> ~/.zshrc
    echo '[ -s "$(brew --prefix nvm)/etc/bash_completion.d/nvm" ] && \. "$(brew --prefix nvm)/etc/bash_completion.d/nvm"' >> ~/.zshrc
    source ~/.zshrc

Install NodeJS

    nvm install 22

Install Java

    brew install java
    echo 'export PATH="/opt/homebrew/opt/openjdk/bin:$PATH"' >> ~/.zshrc

Install Maven

    brew install maven
