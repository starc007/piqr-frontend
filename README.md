# Sanchar Frontend

### IMPORTANT :

Try to use the `git-flow` model as mentioned in this article **https://nvie.com/posts/a-successful-git-branching-model/** since we also use versioning. This is how it can be done:

- The repository is divided into `master`, `develop`, `fix/`, `feature/`, `update/` and `refactor/` branches
- `develop` contains the updated version of whats out there and also whats going to go in the subsequent release. Its the default branch
- `master` contains versioned releases of whats being pushed from `develop`. Everything that would go live to the users would be from the `master` branch.
- between master and develop, there can be 3 types of interstitial branches:
  - `release-v1.0.0`, `patch-v1.0.1` and `hotfix-v1.0.1` (1.0.0 being the semantic version number)
    - `release` is more for a new feature or huge update of sorts
    - `patch` for non-urget updates/fixes
    - `hotfix` for urgent fixes
  - These would be merged to both `master` and also with `develop` (refer the link mentioned above)
- every other branch would be branched off of `develop` create a branch with the suffix:
  - `fix/[whatufixing]` to add bug fixes in an existing feature
  - `feature/[featurename(s)]` for adding features
  - `update/[feature(s)]` for adding updates to existing feature
  - `refactor/[whaturefactorin]` for refactoring
- while you are at work, it may help you to rebase the current branch with the develop branch so that you may keep yourself updated (squashing may help reduce the rebase hell)
- once done, you may create a pull request(PR) or tell whoever is in charge to merge with develop if ready for release. Make sure to put appropriate commit messages.
- The maintainer reviews the code and then squashes the branch and also the commit messages and then merges it to develop.
- Once the develop branch is ready with all things to be made live, the maintainer then creates an appropriate interstitial branch with an updated semantic version (in package.json) with a commit that describes in points whats in the release. No need to be so elaborate.
- Next, the interstitial branch is shifted to master n published.
- Do not publish just like that from whatever branch u r in. Whatever is gonna be put to production for the end user, make sure its either thru master/develop.

### Initial Setup steps :

yarn package manager is used for setup of the repo.
steps to follow.

- yarn install.

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Headless UI](https://headlessui.com/)
