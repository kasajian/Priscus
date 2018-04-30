cd app
call npm unlink ezcurl
call npm rm --global ezcurl

call npm unlink ezrest
call npm rm --global ezrest
cd ..

call npm ls --global --depth=0 ezcurl ezrest