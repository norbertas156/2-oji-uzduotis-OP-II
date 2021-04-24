#pragma once
#include "My_lib.h"
#include "Funkcijos.h"

class Studentas {
    private:
    string vardas_;
    string pavarde_;
    double vidurkis_;
    int egzaminas_;
    double mediana_;
    vector <int>pazymiai_;
    public:
    Studentas(): egzaminas_(0){}
    Studentas(const string &vardas,const string &pavarde);
    inline string vardas() const {return vardas_;}
    inline string pavarde() const {return pavarde_;}
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

