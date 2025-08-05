import google.generativeai as genai
from app.core.config import GEMINI_API_KEY

class GeminiService:
    def __init__(self):
        genai.configure(api_key=GEMINI_API_KEY)
        self.model = genai.GenerativeModel('gemini-pro')

    def generate_gherkin(self, user_story_description: str) -> str:
        prompt = f'''
        Analyze the following user story and convert it into Gherkin syntax.
        The Gherkin should include a "Feature" name, and at least one "Scenario" with "Given", "When", and "Then" steps.
        If applicable, create multiple scenarios for different outcomes (e.g., success and failure).
        The output should be only the Gherkin text, without any extra explanations.

        User Story:
        "{user_story_description}"

        Generated Gherkin:
        '''
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"Error calling Gemini API: {e}")
            raise

gemini_service = GeminiService()