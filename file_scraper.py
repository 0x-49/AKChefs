import os
import json
from datetime import datetime

def scan_files():
    # File extensions to look for
    target_extensions = {'.tsx', '.ts', '.css', '.html', '.xml', '.js', '.json'}
    
    # Directories to skip
    skip_dirs = {'node_modules', 'dist', 'build', '.git', '.next', 'coverage', '__pycache__'}
    
    # Files to skip
    skip_files = {
        'package-lock.json', 'yarn.lock', 'tsconfig.json', 'jest.config.js',
        'webpack.config.js', '.eslintrc', '.prettierrc', 'vite.config.ts'
    }
    
    # Get the current directory
    base_dir = os.path.dirname(os.path.abspath(__file__))
    print(f"Scanning directory: {base_dir}")
    
    # Output file
    output_file = os.path.join(base_dir, 'combined.txt')
    files_found = 0
    
    # Open the output file in write mode
    with open(output_file, 'w', encoding='utf-8') as out_f:
        # Walk through all directories
        for root, dirs, files in os.walk(base_dir):
            # Skip unwanted directories
            dirs[:] = [d for d in dirs if d not in skip_dirs]
            
            for file in files:
                # Skip unwanted files and check for target extensions
                if (file not in skip_files and 
                    any(file.endswith(ext) for ext in target_extensions)):
                    
                    file_path = os.path.join(root, file)
                    relative_path = os.path.relpath(file_path, base_dir)
                    
                    # Skip files that are likely not content-related
                    if ('test' in file.lower() or 
                        'spec' in file.lower() or 
                        file.startswith('.')):
                        continue
                    
                    files_found += 1
                    print(f"Processing file ({files_found}): {relative_path}")
                    
                    try:
                        # Read file content
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                        
                        # Write to output file with clear separation
                        out_f.write(f"\n{'='*80}\n")
                        out_f.write(f"File Path: {file_path}\n")
                        out_f.write(f"{'='*80}\n\n")
                        out_f.write(content)
                        out_f.write("\n\n")
                        
                    except Exception as e:
                        print(f"Error reading file {file_path}: {str(e)}")

    print(f"\nScan complete!")
    print(f"Total files found: {files_found}")
    print(f"Results saved to: {output_file}")

if __name__ == "__main__":
    print("Starting file scan...")
    scan_files()
    print("Scan complete!")
