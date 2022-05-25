from msilib.schema import Feature
from behave import when, given, then
import time
from features import environment as env
import os



@then('the position {prep} the robot "{identifier}" is "{position}"')
@given('the position {prep} the robot "{identifier}" is "{position}"')
def step_given(context, identifier : str, position, prep):

    joint_positions = env.get_position(position)
    if(context.receiver.getActualQ() != joint_positions):
        context.controller.moveJ(joint_positions, env.get_speed(), env.get_acceleration())

@then('the signal {prep} the {entity} "{identifier}" is "{state}"')
@given('the signal {prep} the {entity} "{identifier}" is "{state}"')
def step_given(context, identifier : str, state : str, prep, entity):
    input_state = (state == "ON")
    detected = False

    t_end = time.time() + 10
    while time.time() < t_end:

        input_bits  = context.receiver.getActualDigitalInputBits()
        actual_state = env.get_digital_input_state(env.get_digital_input(identifier), input_bits)

        if actual_state == input_state :
            detected = True
            assert True
            break

    if not detected:    
        assert False, "Desired signal was not detected within 10 seconds"
    
@then('the output "{identifier}" is {state}')
@given('the output "{identifier}" is {state}')
@then('the light "{identifier}" is {state}')
@given('the light "{identifier}" is {state}')
@then('the buzzer "{identifier}" is {state}')
@given('the buzzer "{identifier}" is {state}')
def step_then(context, identifier : str, state):
   signal = (state=="ON")  # True if state is ON, else False
   output = env.get_digital_output(identifier)
   context.io.setStandardDigitalOut(output, signal)



@then('the gripper "{identifier}" is {state}')
@given('the gripper "{identifier}" is {state}')
def step_then(context, identifier : str, state):
    desired_state_open = (state=="opened")
    if (desired_state_open):
        context.gripper.open()
    else:
        context.gripper.close()
    
    
@when('the output "{identifier}" {action}')
@when('the light "{identifier}" {action}')
@when('the buzzer "{identifier}" {action}')
def step_when(context, identifier : str, action):
    signal = (action=="activates")  # True if state is activates, else False
    output = env.get_digital_output(identifier)
    context.io.setStandardDigitalOut(output, signal)


@when('the robot "{identifier}" moves to position "{position}"')
def step_when(context, identifier : str, position):

    joint_position = env.get_position(position)
    controller = context.controller
    
    controller.moveJ(joint_position, env.get_speed(), env.get_acceleration())


@when('the robot "{identifier}" linearly moves to position "{position}"')
def step_when(context, identifier : str, position):

    joint_positions = env.get_position(position)
    controller = context.controller
    
    controller.moveL_FK(joint_positions, env.get_speed(), env.get_acceleration())

@when('the robot "{identifier}" moves to position "{position}" with "{speed}" speed')
def step_when(context, identifier : str, position, speed : str):

    joint_positions = env.get_position(position)
    controller = context.controller
    
    controller.moveJ(joint_positions, env.get_speed(speed), env.get_acceleration(speed))

@when('the robot "{identifier}" linearly moves to position "{position}" with "{speed}" speed')
def step_when(context, identifier : str, position, speed : str):

    joint_positions = env.get_position(position)
    controller = context.controller
    
    controller.moveL_FK(joint_positions, env.get_speed(speed), env.get_acceleration(speed))


@when('the gripper "{identifier}" {action}')
def step_then(context, identifier : str, action):
    desired_action_open = (action=="opens")
    if (desired_action_open):
        context.gripper.open()
    else:
        context.gripper.close()