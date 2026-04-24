# Assignment 2a - GitHub Version Control

## Aim

Create a GitHub account, create a repository, and push local code using Git commands.

## Steps

1. Create an account at `https://github.com`.
2. Install Git and verify the installation.

```bash
git --version
```

3. Configure your name and email.

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

4. Create or open a project folder.

```bash
mkdir wad-assignments
cd wad-assignments
```

5. Initialize Git and check status.

```bash
git init
git status
```

6. Add files and commit changes.

```bash
git add .
git commit -m "Add WAD assignments"
```

7. Create a new repository on GitHub, then connect the local repository.

```bash
git remote add origin https://github.com/your-username/wad-assignments.git
git branch -M main
```

8. Push the code to GitHub.

```bash
git push -u origin main
```

9. Pull future changes when needed.

```bash
git pull origin main
```

## Common Git Commands

| Command | Purpose |
| --- | --- |
| `git status` | Shows changed and staged files |
| `git add .` | Stages all files |
| `git commit -m "message"` | Saves a snapshot locally |
| `git log --oneline` | Shows commit history |
| `git remote -v` | Shows linked GitHub repository |
| `git push` | Uploads commits to GitHub |
| `git pull` | Downloads latest remote changes |

## Conclusion

Git and GitHub help track code changes, keep project history, and share work with others.
