import openai
from dotenv import find_dotenv, load_dotenv
import time
import logging
from datetime import datetime
# from flask import Flask, request, jsonify

# app = Flask(__name__)

load_dotenv()
# openai.api_key = os.environ.get("OPENAI_API_KEY")
# defaults to getting the key using os.environ.get("OPENAI_API_KEY")
# if you saved the key under a different environment variable name, you can do something like:
# client = OpenAI(
#   api_key=os.environ.get("CUSTOM_ENV_NAME"),
# )

client = openai.OpenAI()
model = "gpt-3.5-turbo-16k"

# # ==  Create our Assistant (Uncomment this to create your assistant) ==
assistant = client.beta.assistants.create(
    name="Moroccan Explorer",
    instructions="""You should have comprehensive knowledge about Morocco, including its history, geography, culture, traditions, and local customs. You should be able to provide information about famous monuments, local cuisine, traditional clothing, and popular festivals.
You should be able to suggest popular tourist destinations, provide directions, recommend local foods to try, and share interesting facts about the places.
You should respect and understand Moroccan customs and traditions to provide appropriate advice. For example, you should know about local etiquette, religious customs, and social norms.
You should provide the latest information. For example, you should know the current weather, local news, or any events happening around.
In case of emergencies, you should be able to provide information about the nearest hospitals, police stations, and embassies.
You could help users with booking accommodations, restaurants, or tickets for local attractions. """,
    model=model,
)
asistant_id = assistant.id
# print(asistant_id)


# === Thread (uncomment this to create your Thread) ===
thread = client.beta.threads.create(
    # messages=[
    #     {
    #         "role": "user",
    #         "content": "How do I get started working out to lose fat and build muscles?",
    #     }
    # ]
)
thread_id = thread.id
# print(thread_id)



# # ==== Create a Message ====
# message = "KASBAH DES OUDAYAS"
# message = client.beta.threads.messages.create(
#     thread_id=thread_id, role="user", content=message
# )

# # === Run our Assistant ===
# run = client.beta.threads.runs.create(
#     thread_id=thread_id,
#     assistant_id=asistant_id,
# )

# @app.route('/Search', methods=['POST'])
# def Search():
#     message = request.json["message"]
#     result = wait_for_run_completion(msg=message)
#     return jsonify(result)


def wait_for_run_completion(client=client, thread_id=thread_id, sleep_interval=5, msg = "hi"):
    # ==== Create a Message ====
    # message = "KASBAH DES OUDAYAS"
    message = client.beta.threads.messages.create(
        thread_id=thread_id, role="user", content=msg
    )
    # === Run our Assistant ===
    run = client.beta.threads.runs.create(
        thread_id=thread_id,
        assistant_id=asistant_id,
    )
    run_id = run.id
    """

    Waits for a run to complete and prints the elapsed time.:param client: The OpenAI client object.
    :param thread_id: The ID of the thread.
    :param run_id: The ID of the run.
    :param sleep_interval: Time in seconds to wait between checks.
    """
    while True:
        try:
            run = client.beta.threads.runs.retrieve(thread_id=thread_id, run_id=run_id)
            if run.completed_at:
                elapsed_time = run.completed_at - run.created_at
                formatted_elapsed_time = time.strftime(
                    "%H:%M:%S", time.gmtime(elapsed_time)
                )
                print(f"Run completed in {formatted_elapsed_time}")
                logging.info(f"Run completed in {formatted_elapsed_time}")
                # Get messages here once Run is completed!
                messages = client.beta.threads.messages.list(thread_id=thread_id)
                last_message = messages.data[0]
                response = last_message.content[0].text.value
                print(f"Assistant Response: {response}")
                return response;
                break
        except Exception as e:
            logging.error(f"An error occurred while retrieving the run: {e}")
            break
        logging.info("Waiting for run to complete...")
        time.sleep(sleep_interval)


# === Run ===
# wait_for_run_completion(msg="KASBAH DES OUDAYAS")

# ==== Steps --- Logs ==
# run_steps = client.beta.threads.runs.steps.list(thread_id=thread_id, run_id=run.id)
# print(f"Steps---> {run_steps.data[0]}")

# if __name__ == '__main__':
	# app.run(debug=True)