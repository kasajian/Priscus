cd app
call npm rm --global ezcurl
call npm unlink ezcurl

call npm rm --global ezrest
call npm unlink ezrest
cd ..

call npm ls --global --depth=0 ezcurl ezrest