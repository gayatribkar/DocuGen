def convert_ml_json_to_text(ml_data):
    """Convert ML API response to code_analysis.txt format"""
    text_lines = []
    
    # Process file groups
    text_lines.append("# File Structure Analysis #")
    for group, files in ml_data.get('groups', {}).items():
        text_lines.append(f"\n🔍 Analyzing group: {group}")
        for file in files:
            text_lines.append(f"\n📄 File: {file}")
            text_lines.append("Imports: [sample_import]")  # Update with real data if available
            text_lines.append("Functions: [sample_function]")  # Update with real data
    
    # Add chunk information
    text_lines.append("\n\n# Code Chunks Analysis #")
    for chunk in ml_data.get('chunks', []):
        text_lines.append(f"\n🧩 Chunk: {', '.join(chunk)}")
    
    # Add summary prompts
    text_lines.append("\n\n# Documentation Prompts #")
    for summary in ml_data.get('summary', []):
        text_lines.append(f"\n📝 Prompt for {', '.join(summary['chunk'])}:")
        text_lines.append(summary['prompt'])
    
    return '\n'.join(text_lines)