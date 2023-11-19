# First, I need to read all the uploaded HTML files to combine them into a single file named 'index.html'

file_paths = [
    "forgotPass.html",
    "home.html",
    "login.html",
    "otp.html",
    "signUp.html"
]

# Reading the contents of each file
file_contents = []
for file_path in file_paths:
    with open(file_path, 'r') as file:
        file_contents.append(file.read())

# Combining the contents into a single string
combined_content = '\n'.join(file_contents)

# Saving the combined content into a new file 'index.html'
index_html_path = "index.html"
with open(index_html_path, 'w') as index_file:
    index_file.write(combined_content)

index_html_path
