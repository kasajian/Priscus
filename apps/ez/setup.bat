cd ezcurl
call npm install
call npm prune
call npm link
cd ..

cd ezrest
call npm install
call npm prune
call npm link
call npm link ezcurl
cd ..

cd eztfs
call npm install
call npm prune
call npm link
call npm link ezrest
cd ..

cd app
call npm install
call npm link eztfs
call npm prune
cd ..

call npm ls --global --depth=0 ezcurl ezrest