#include <node.h>
#include <string>
#include <cstdlib>
#include <ctime>
#include <iostream>

using namespace std;

string messUp2(string a)
{
    if (a.size() % 2 == 0)
    {
        string b = "";
        for (int i = 0; i < a.size() / 2; i++)
        {
            b = b + a.substr(i, 1) + a.substr(a.size() - i - 1, 1);
        }
        string c = b;
        for (int i = 0; i < b.size(); i+=2)
        {
            c[c.size() / 2 - i / 2 - 1] = b[i];
            c[c.size() / 2 + i / 2] = b[i + 1];
        }
        return(c);
    }
    else
    {
        string b = "";
        for (int i = 0; i < a.size() / 2; i++)
        {
            b = b + a.substr(i, 1) + a.substr(a.size() - i - 1, 1);
        }
        b = b + a.substr(a.size() / 2, 1);
        string c = b;
        c[c.size() / 2] = b[b.size() - 1];
        for (int i = 0; i < b.size(); i+=2)
        {
            c[c.size() / 2 - i / 2] = b[i];
            if (i + 1 < b.size())
                c[c.size() / 2 + i / 2 + 1] = b[i + 1];
        }
        return(c);
    }
}
string messUp(string a)
{
    if (a.size() < 255)
    {
        int start = 0;
        while (a.size() < 255)
        {
            start = start + 1;
            for (int i = start; i < a.size() && a.size() < 255; i+=7)
            {
                a = a + a.substr(i, 1);
            }
        }
    }
    string b = "";
    for (int i = 0; i < a.size() / 2; i++)
    {
        b = b + a.substr(i, 1) + a.substr(a.size() - i - 1, 1);
    }
    b = b + a.substr(a.size() / 2, 1);
    for (int i = b.size() / 5; i < b.size() - b.size() / 5; i+=3)
    {
        b = messUp2(b.substr(0, i)) + messUp2(b.substr(i));
    }
    string c = b;
    c[c.size() / 2] = b[254];
    for (int i = 0; i < b.size(); i+=2)
    {
        c[c.size() / 2 - i / 2] = b[i];
        c[c.size() / 2 + i / 2] = b[i + 1];
    }
    return(c);
}
string f(string password, string salt)
{
    for (int j = 0; j < salt.size(); j++)
    {
        for (int i = 0; i < password.size(); i+=2)
        {
            if (salt.size() == j)
                break;
            password = password.substr(0, i) + salt.substr(j, 1) + password.substr(i);
            j++;
        }
    }
    for (int cou = 0; cou < 250; cou++)
    {
        password = messUp(messUp2(password).substr(0, 255)).substr(0, 126);
    }
    return(password);
}
void Sum(const v8::FunctionCallbackInfo<v8::Value>& args)
{
    v8::Isolate* isolate = args.GetIsolate();
    v8::String::Utf8Value str0(isolate, args[0]);
    v8::String::Utf8Value str1(isolate, args[1]);
    string a(*str0), b(*str1);
    string s2 = f(a, b);
    args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, s2.c_str()).ToLocalChecked());
}

void Initialize(v8::Local<v8::Object> exports)
{
    NODE_SET_METHOD(exports, "sum", Sum);
}

NODE_MODULE(addon, Initialize);