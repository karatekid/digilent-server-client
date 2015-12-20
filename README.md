# digilent-server-client
A frontend for the [Digilent Analog Discovery](http://www.digilentinc.com/Products/Detail.cfm?Prod=ANALOG-DISCOVERY)
that works on Linux!


## Getting Started

### Installation Instructions

This project uses Thrift to communicate between the frontend and backend, so you'll need to install it, you can find it [here](https://thrift.apache.org).

1. [Install Thrift](https://thrift.apache.org/docs/install/debian), I'd recommend [building from source](https://thrift.apache.org/docs/BuildingFromSource)
2. Run `make`
3. You can then execute the compiled executable
4. To enable your frontend to work,you should run a local server in the current
   directory, ie)
```
python -m SimpleHTTPServer
```
5. You can now navigate there and starting using your Oscilloscope




### How to use it




### How it works

It makes use of [digilent-simplified](https://github.com/karatekid/digilent-simplified) to communicate with the actual device.



