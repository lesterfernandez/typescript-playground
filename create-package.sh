#!/usr/bin/env bash
if [ ! $# -eq 1 ] || [[ $1 = *" "* ]]
then
  echo "Usage: create-package <package>"
  exit 1
fi

mkdir $1
cp base/tsconfig.json base/index.ts  $1
cat base/package.json | sed "s/base/$1/" > $1/package.json
cd $1
npm i
cd ..
