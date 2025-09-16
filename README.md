# Futbol Takımı Karıştırıcı

Bu proje, oyuncu isimlerini kullanarak iki takıma rastgele dağıtım yapan basit bir web uygulamasıdır. Uygulama, kullanıcıların girdiği oyuncu isimleriyle birlikte, bazı özel koşullar (örneğin, belirli oyuncuların birlikte veya ayrı takımlarda olması) tanımlamalarını da desteklemektedir.

## Özellikler

- **Oyuncu isimleri**: Her satıra bir oyuncu ismi girilebilir.
- **Minimum oyuncu sayısı**: Takım başına düşen minimum oyuncu sayısı ayarlanabilir.
- **Takım isimleri**: İsteğe bağlı olarak takım isimleri girilebilir, aksi halde varsayılan isimler (Takım 1, Takım 2) kullanılır.
- **Koşulsal düzenlemeler**: 
  - *Aynı takımda olması gerekenler*: Belirli oyuncuların birlikte takıma dağıtılması sağlanır.
  - *Aynı takımda olmaması gerekenler*: Belirli oyuncuların aynı takımda yer almaması sağlanır.
- **Karanlık mod**: Dark/Light mod desteği bulunmaktadır. 
- **Animasyon**: Takım oluşturma sürecinde basit animasyonlar ile görsel iyileştirme yapılmaktadır.

## Kullanım

1. `index.html` dosyasını bir tarayıcıda açın.
2. Form üzerinde, her satıra bir oyuncu gelecek şekilde oyuncu isimlerini girin.
3. Her takım başına minimum oyuncu sayısını belirleyin.
4. İsteğe bağlı olarak takım isimlerini düzenleyin.
5. "Aynı takımda olması gerekenler" veya "Aynı takımda olmaması gerekenler" gibi özel koşullar ekleyin.
6. "Takımları Karıştır" butonuna basın. Uygulama, tüm koşulları sağlayan rastgele bir dağıtım yapacaktır. 

## Teknolojiler

- **HTML**: Sayfa yapısı
- **Tailwind CSS**: Stil ve responsive tasarım
- **JavaScript**: İşlevsellik ve animasyonlar

## Proje Dosyaları

- `index.html`: Uygulamanın ana HTML dosyası
- `script.js`: Dinamik işlevlerin ve form işlemlerinin bulunduğu JavaScript dosyası
- `style.css`: Özel stil ayarlarının yapıldığı CSS dosyası

## Kurulum

Dosyaları bir web sunucusu üzerinden veya yerel olarak açarak uygulamayı kullanabilirsiniz. Herhangi bir ek yapılandırma gerekmez.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
