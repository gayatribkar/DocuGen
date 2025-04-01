# import openai
# import os
# from typing import Dict, List

# # Set your OpenAI API key here
# openai.api_key = ''
# # openai.api_key = os.getenv('OPENAI_API_KEY', 'sk-default-key')
# os.environ['USER_PERSONA'] = 'expert'  # At the start of your script

# # 2. Change the default fallback value
# persona = os.getenv('USER_PERSONA', 'expert').lower() 

# def parse_input_file(input_path: str) -> Dict[str, dict]:
#     """
#     Parses the structured input file containing AST analysis results.
    
#     Args:
#         input_path: Path to the input text file with code structure
        
#     Returns:
#         Dictionary of file data with imports and functions
#     """
#     files_data = {}
#     current_file = None
    
#     with open(input_path, 'r', encoding='utf-8') as f:
#         for line in f:
#             line = line.strip()
#             if line.startswith('🔍'):
#                 current_file = line.split()[-1]
#                 files_data[current_file] = {
#                     'imports': [],
#                     'unresolved': [],
#                     'functions': []
#                 }
#             elif 'Found imports:' in line:
#                 imports = line.split(': ')[1].strip('[]').replace("'", "").split(', ')
#                 files_data[current_file]['imports'] = imports
#             elif '⚠️' in line:
#                 dep = line.split('→')[0].split('resolve ')[1].strip().strip("'")
#                 files_data[current_file]['unresolved'].append(dep)
#             elif '-' in line and '()' in line:
#                 func_name = line.split(' - ')[0].split('- ')[1].strip()
#                 desc = line.split(' - ')[1].strip()
#                 files_data[current_file]['functions'].append((func_name, desc))
    
#     return files_data

# def generate_documentation(prompt: str) -> str:
#     """Generates documentation using OpenAI's GPT-4o model"""
#     response = openai.ChatCompletion.create(
#         model="gpt-4o",
#         messages=[{"role": "system", "content": prompt}],
#         max_tokens=500
#     )
#     return response.choices[0].message['content'].strip()

# def create_prompt(persona: str, func_name: str, func_desc: str, imports: List[str], unresolved: List[str]) -> str:
#     """
#     Creates persona-specific documentation prompts.
    
#     Args:
#         persona: Target user persona (beginner|intermediate|expert)
#         func_name: Name of the function
#         func_desc: Existing function description
#         imports: List of imports in the file
#         unresolved: List of unresolved dependencies
        
#     Returns:
#         Formatted prompt string
#     """
#     base_prompt = f"""
#     Function: {func_name}
#     Existing Description: {func_desc}
#     File Dependencies: {imports}
#     Unresolved Dependencies: {unresolved}
    
#     Create documentation that:"""
    
#     persona_specific = {
#         'beginner': """
#         - Explains concepts in simple language
#         - Provides step-by-step usage examples
#         - Warns about potential pitfalls with dependencies
#         - Includes troubleshooting tips""",
        
#         'intermediate': """
#         - Focuses on practical usage patterns
#         - Explains integration with other components
#         - Includes best practice recommendations
#         - Mentions performance characteristics""",
        
#         'expert': """
#         - Provides concise technical specification
#         - Details architectural considerations
#         - Includes advanced configuration options
#         - Explains security implications"""
#     }
    
#     return base_prompt + persona_specific.get(persona, persona_specific['intermediate'])

# def generate_file_documentation(file_data: dict, persona: str) -> str:
#     """
#     Generates complete documentation for a file.
    
#     Args:
#         file_data: Parsed file information
#         persona: Target documentation level
        
#     Returns:
#         Formatted documentation string
#     """
#     docs = []
    
#     # File header
#     docs.append(f"# File Documentation\n")
#     docs.append(f"## Dependencies\nImports: {', '.join(file_data['imports'])}")
#     if file_data['unresolved']:
#         docs.append(f"Unresolved Dependencies: {', '.join(file_data['unresolved'])}\n")
    
#     # Function documentation
#     docs.append("\n## Functions\n")
#     for func_name, func_desc in file_data['functions']:
#         prompt = create_prompt(persona, func_name, func_desc, 
#                               file_data['imports'], file_data['unresolved'])
#         docs.append(f"### {func_name}\n{generate_documentation(prompt)}\n")
    
#     return '\n'.join(docs)

# import os  # Import the 'os' module at the beginning of the file

# def document_codebase(input_file: str, output_dir: str):
#     """
#     Main function to process input file and generate documentation.
    
#     Args:
#         input_file: Path to input analysis file
#         output_dir: Directory to save documentation files
#     """
#     # Get persona from environment variable
#     persona = os.getenv('USER_PERSONA', 'intermediate').lower()
#     valid_personas = ['beginner', 'intermediate', 'expert']
    
#     if persona not in valid_personas:
#         raise ValueError(f"Invalid persona {persona}. Must be one of {valid_personas}")
    
#     # Parse input and generate docs
#     files_data = parse_input_file(input_file)
    
#     # Create the output directory if it doesn't exist
#     os.makedirs(output_dir, exist_ok=True)
    
#     for file_path, data in files_data.items():
#         documentation = generate_file_documentation(data, persona)
#         output_path = os.path.join(output_dir, 
#                                  os.path.basename(file_path).replace('.py', '.txt'))
        
#         with open(output_path, 'w') as f:
#             f.write(documentation)

# # Example usage:
# # Set environment variable: export USER_PERSONA=intermediate
# # document_codebase('code_analysis.txt', 'docs/')



import openai
import os
from typing import Dict, List, Tuple

def parse_input_file(input_path: str) -> Dict[str, dict]:
    """Parse converted analysis text file"""
    files_data = {}
    current_file = None
    
    with open(input_path, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if line.startswith('📄 File:'):
                current_file = line.split(': ')[1]
                files_data[current_file] = {
                    'imports': [],
                    'unresolved': [],
                    'functions': []
                }
            elif line.startswith('Imports:'):
                files_data[current_file]['imports'] = line.split(': ')[1].strip('[]').split(', ')
            elif line.startswith('Functions:'):
                funcs = line.split(': ')[1].strip('[]').split(', ')
                files_data[current_file]['functions'] = [(f, "") for f in funcs]
    
    return files_data

def generate_documentation(prompt: str) -> str:
    """Generates documentation using OpenAI's GPT-4o model"""
    response = openai.ChatCompletion.create(
        model="gpt-4o",
        messages=[{"role": "system", "content": prompt}],
        max_tokens=1500
    )
    return response.choices[0].message['content'].strip()

def create_prompt(persona: str, file_info: dict) -> str:
    """
    Creates persona-specific documentation prompts.
    
    Args:
        persona: Target user level (beginner|intermediate|expert)
        file_info: Dictionary containing file analysis data
        
    Returns:
        Formatted prompt string
    """
    base_prompt = f"""
    File: {file_info['path']}
    Imports: {', '.join(file_info['imports'])}
    Functions: {[f[0] for f in file_info['functions']]}
    Unresolved Dependencies: {', '.join(file_info['unresolved'])}
    
    Create documentation that:"""
    
    persona_specific = {
        'beginner': """
        - Uses simple language and analogies
        - Explains concepts like the reader is new to programming
        - Includes step-by-step usage examples
        - Highlights common mistakes to avoid
        - Provides troubleshooting tips""",
        
        'intermediate': """
        - Focuses on practical usage patterns
        - Explains integration with other components
        - Includes best practice recommendations
        - Mentions performance considerations
        - Provides configuration examples""",
        
        'expert': """
        - Provides concise technical specifications
        - Details architectural decisions
        - Includes advanced customization options
        - Explains security implications
        - References relevant algorithms/patterns"""
    }
    
    return base_prompt + persona_specific.get(persona.lower(), persona_specific['intermediate'])

def generate_file_documentation(file_data: dict, persona: str) -> str:
    """
    Generates complete documentation for a file.
    
    Args:
        file_data: Parsed file information
        persona: Target documentation level
        
    Returns:
        Formatted documentation string
    """
    docs = []
    
    # File header
    docs.append(f"# {os.path.basename(file_data['path'])} Documentation\n")
    
    # Dependencies section
    docs.append("## Dependencies")
    docs.append(f"**Imports:** {', '.join(file_data['imports']) or 'None'}")
    if file_data['unresolved']:
        docs.append(f"**Unresolved Dependencies:** {', '.join(file_data['unresolved'])}")
    
    # Functions documentation
    docs.append("\n## Functions\n")
    for func_name, func_desc in file_data['functions']:
        prompt = create_prompt(persona, {
            'path': file_data['path'],
            'imports': file_data['imports'],
            'unresolved': file_data['unresolved'],
            'functions': [(func_name, func_desc)]
        })
        
        docs.append(f"### {func_name}")
        docs.append(generate_documentation(prompt))
    
    return '\n'.join(docs)

def document_codebase(input_file: str, output_dir: str, persona: str):
    """Main documentation generation function"""
    files_data = parse_input_file(input_file)
    os.makedirs(output_dir, exist_ok=True)
    
    # Generate documentation for each file
    for file_path, data in files_data.items():
        documentation = generate_file_documentation(data, persona)
        output_path = os.path.join(output_dir, f"docs_{os.path.basename(file_path)}.txt")
        
        with open(output_path, 'w') as f:
            f.write(documentation)