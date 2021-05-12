#pragma once
#include "My_lib.h"
#include "Funkcijos.h"

class zmogus {
    protected:
    string vardas_;
    string pavarde_;
    public:
    explicit zmogus(){
        vardas_="";
        pavarde_="";
    };
    explicit zmogus(const string &vardas,const string &pavarde){
    vardas_=vardas;
    pavarde_=pavarde;
    };
    virtual const string &vardas() const=0;
    virtual const string &pavarde() const=0;


};



class Studentas: public zmogus {
    private:
    double vidurkis_;
    int egzaminas_;
    double mediana_;
    vector <int>pazymiai_;
    public:
    Studentas(): egzaminas_(0){}

    ~Studentas();
    Studentas(const Studentas& studentas);
    Studentas& operator=(const Studentas& studentas);
    explicit Studentas(const string &vardas,const string &pavarde):zmogus(vardas, pavarde){};
    const string &vardas() const override;
    const string &pavarde() const  override;
    inline vector<int> getPazymiai() const {return pazymiai_;}
    inline double galVidurkis() const {return vidurkis_;}
    inline double galMediana() const {return mediana_;}
    inline int getEgzaminas() const {return egzaminas_;}
    
    void setPazymiai(int);
    void pasalintiPaskutiniPaz();
    void egzaminoPaz(int);
    void setVidurkis();
    void setMediana();

};

bool compare(const Studentas&, const Studentas&);

