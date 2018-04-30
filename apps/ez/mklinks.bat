cd ezcurl
call npm intall
call npm link
cd ..

cd ezrest
call npm intall
call npm link
cd ..

cd app
call npm install
call npm link ezcurl
call npm link ezrest
cd ..

call npm ls --global --depth=0 ezcurl ezrest