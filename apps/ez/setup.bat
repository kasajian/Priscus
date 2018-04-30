cd ezcurl
call npm intall
call npm prune
call npm link
cd ..

cd ezrest
call npm intall
call npm prune
call npm link ezcurl
call npm link
cd ..

cd eztfs
call npm intall
call npm prune
call npm link ezrest
call npm link
cd ..

cd app
call npm install
call npm prune
call npm link eztfs
cd ..

call npm ls --global --depth=0 ezcurl ezrest