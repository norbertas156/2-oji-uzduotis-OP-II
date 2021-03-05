#include "Funkcijos/My_lib.h"
#include "Funkcijos/Main_h.h"
#include "Funkcijos/Funkcijos.h"




int main(){
	vector <Studentas> studentai;
	cout<<"Ar norite ivesti studentus ranka(r) ar is failo(f)?"<<endl;
	string x;
	string file;
	cin>>x;
	while(x!="r" && x!="f"){
		cin.clear();
		cout<<"Neteisinga ivestis! Prasome ivesti r arba f"<<endl;
		cin>>x;
	}
	try{
	if(x=="r"){
	while(true){
	Studentas studentas;
	Ivedimas(studentas);
	vidurkis(studentas);
	mediana(studentas);
	studentai.push_back(studentas);
	if(Rtikrinimas()!="t"){
		break;
	}
	}
	sorting(studentai);
	Isvedimas(studentai);
	}
	else{
		
			cout<<"Iveskite .txt failo pavadinima"<<endl;
		cin>>file;
		fileIvedimas(studentai, file);	
		sorting(studentai);
		fileIsvedimas(studentai);
		
		//Isvedimas(A, i);
	}
	return 0;
	}
	catch(std::exception& e){
			std::cerr<<e.what()<<endl;
		}
	
	
}
