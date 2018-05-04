var stack = [];
stack.push(2);       // stack is now [2]
stack.push(5);       // stack is now [2, 5]

function linkedList() {
    var _head;
    function getHead() {
        return _head;
    }
    return {getHead};
}
linkedList.validate = function() {
    var list = linkedList();
    if (list.getHead()) throw 0;
}

function persStack() {
    return {
        push: function() {},
        pop: function() {}
    };
}

// Validate
function valiate() {
    function validateQueue() {
        var queue = [];
        a = [2,5,3,8,1,9,7,11,0,4,6,12,.5,13,99,-1,-5,42,67,93,23,27,34,38,76];
        a.forEach(function(i){queue.push(i)})
        var i = 0;
        while(queue.length) {
            v = queue.shift(); // dequeue
            if (a[i] !== v) throw i;
            i++
        }
    }
    validateQueue();
    linkedList.validate();
    console.log("all pass");
}
valiate();
