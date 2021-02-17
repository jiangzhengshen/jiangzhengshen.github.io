ETAMakeFeatures和ETATools封装为so文件，供python调用
- pybind11：https://github.com/tensorflow/community/blob/master/rfcs/20190208-pybind11.md；openspiel
- SWIG
- boost.python
- ctypes：https://stackoverflow.com/questions/1615813/how-to-use-c-classes-with-ctypes
- Cython：https://zhuanlan.zhihu.com/p/74219095
- python extension
- 只需从 C/C++ 调用 Python，简单地用 Python 程序库的 [https://docs.python.org/2/c-api/index.html](C API)。
- 从 Python 调用 C 可以用 https://docs.python.org/2/library/ctypes.html ，但 C++ 的话可考虑 https://www.boost.org/doc/libs/1_66_0/libs/python/doc/html/index.html 或 SWIG。
- 估计性能主要是看看需不需要复杂的 marshalling、GC 等问题，尽量用简单的数据类型，大量数据用简单的 ctypes 数组传递，应该能减少开销。
