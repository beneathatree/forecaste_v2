# TASK

Merge the following branches into the current branch:

{{BRANCHES}}

For each branch:

1. Run `git merge <branch> --no-edit`
2. If there are merge conflicts, resolve them by reading both sides
3. After resolving conflicts, run `npm run lint` and `npm run build` from the repo root
4. If lint or build fail, fix before proceeding to the next branch

(There is no `npm test` / `npm run typecheck` in this project yet.)

After all branches are merged, make a single commit summarizing the merge if needed.

# CLOSE ISSUES

For each merged branch, close its GitHub issue:

`gh issue close <ID> --comment "Completed by Sandcastle"`

Replace `<ID>` with the numeric issue id from the list below.

Here are all the issues:

{{ISSUES}}

Once you've merged everything you can, output <promise>COMPLETE</promise>.
