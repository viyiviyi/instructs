# instructs
一个用来在组件间传递函数/方法的小组件

使用方法：\n
引入文件\n
导入文件内的createStorage方法\n
通过createStorage方法创建一个仓库 返回一个storage对象\n
通过storage对象的add方法给仓库添加内容\n

使用仓库内的方法有两种方式
  1、storage对象的run方法得到一个同步执行函数，执行后马上得到返回值
  2、storage对象的syncRun方法得到一个异步函数调用(Promise对象)，执行后通过then方法得到数据
  
  add方法参数说明 三个参数 
    第一个参数是传递的方法，类型 function
    第二个是方法的调用标识，类型 String
    第三个参数是方法依存的对象，主要用来防止组件被卸载后调用组件内方法引起错误，不传表示方法在任何时候都可以被正常使用
