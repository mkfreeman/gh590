#!/bin/bash
cd /Applications/MAMP/htdocs/gh590
git checkout gh-pages 
git rebase master
git push origin gh-pages
git checkout master 