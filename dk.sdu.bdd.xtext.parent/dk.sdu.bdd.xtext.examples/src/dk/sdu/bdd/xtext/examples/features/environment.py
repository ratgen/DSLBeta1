from msilib.schema import Feature
from pyexpat import features
from behave import fixture
import rtde_receive
import rtde_control
import rtde_io
import json
from logic.sdu_robotics.robotiq_gripper_control import RobotiqGripper
from behave.model import Scenario


f = open("features\Environment.json")
data = json.load(f)
        
def before_all(context):
    print("Setting up Environment...")

    ip = get_robot_ip()
    
    # initialize interfaces
    context.controller = rtde_control.RTDEControlInterface(ip)
    context.receiver = rtde_receive.RTDEReceiveInterface(ip)
    context.io = rtde_io.RTDEIOInterface(ip)

    
    # initialize gripper
    context.gripper = RobotiqGripper(context.controller)
    context.gripper.activate()
    context.gripper.set_speed(get_gripper_speed())
    context.gripper.set_force(get_gripper_force())
    

def before_feature(context, feature): 
    context.controller.moveJ(get_position("default"), get_speed(), get_acceleration())

def after_feature(context, feature):
    pass

def before_scenario(context, scenario): 
    pass

def after_scenario(context, scenario):
    pass
    

# Get speed based naming (if not set, returns moderately)
def get_speed(identifier = "moderate"):
    speed = data["Speeds"][identifier]["speed"]
    return speed

# Get acceleration based naming (if not set, returns moderately)
def get_acceleration(identifier  = "moderate"):
    acceleration = data["Speeds"][identifier]["acceleration"]
    return acceleration

# Get IP-address of robot based on configured name
def get_robot_ip():
    ip = data["Robot"]["IP"]
    return ip

# Get input port based on configured name
def get_digital_input(name):
    inputs = data["Robot"]["Digital inputs"]
    for index in range(len(inputs)):
        for key in inputs[index]:
            if (name == inputs[index][key]):
                return index

# Get input port based on configured name
def get_digital_output(name):
    inputs = data["Robot"]["Digital outputs"]
    for index in range(len(inputs)):
        for key in inputs[index]:
            if (name == inputs[index][key]):
                return index

# Get coordinate-location based on configured name
def get_position(name):
    locations = data["Positions"]
    coordinate = locations[name]

    return coordinate

# Get speed of gripper
def get_gripper_speed():
    speed = data["Gripper"]["speed"]
    return speed

# Get force of gripper
def get_gripper_force():
    force = data["Gripper"]["force"]
    return force

# Converts the bits from getActualDigitalInputBits() to an array with state of each input
def converter(bit):
    bits = bit
    array = []
    for num in range(7,-1,-1):
        if bits-(2**num) >= 0:
            array.append(1)
            bits = bits - (2**num)
        else:
            array.append(0)
    array.reverse()
    return array

def get_digital_input_state(index, value):
    array = converter(value)
    while(array[index] == 1):
        return True
    else:
        return False
