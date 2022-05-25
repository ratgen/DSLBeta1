from behave.__main__ import main as behave_main

from logic.fileReader import readFile
import time
import os

def main():
    readFile()
    path = os.path.join(os.path.dirname(__file__))
    
    # Starts test
    behave_main([path] + ["--stop"])

if __name__ == '__main__':
    main()