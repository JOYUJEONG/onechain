# onechain   
> Special Thanks to naive-coin   
   

블록체인이란 순차적 거래내역을 블록으로 형성한 체인 형태의 공공거래 장부이다.    

블록체인은 분산된 형태의 거래를 통해 투명성을 제공하고 보안 비용을 절감할 수 있다는 점에서 4차 산업혁명 사회의 변혁을 주도할 기술로 주목받고 있다.   

블록체인 기반 비즈니스가 크게 성장하면서 블록체인 프로토콜 개발을 위한 오픈소스의 필요성이 대두되었다.    
이에 여러 기업에서 코드를 제공하고 있지만, 복잡도가 높아 다루기 까다롭고 교육용으로 사용하기에도 어려운 실정이다.    

   
블록체인의 기본 원칙을 가장 간결한 방법으로 구현한 블록체인 프로토콜 ‘원체인(one chain)’을 이용하면 위와 같은 문제를 해결할 수 있다.    

이를 오픈소스로 공유함으로써 블록체인 프로토콜 개발의 기초를 제공하고 국내외 블록체인 사업의 활성화를 이끌고자 한다. 

------

원체인은 Java Script(Type Script)로 개발되어 쉽게 다루고 개발 시간을 단축할 수 있으며, 명료한 알고리즘을 통해 블록체인 교육을 위한 용도로도 활용 가능하다.

프로그래밍 언어로는 편리성과 이식성에서 뛰어난 자바스크립트를 채택했다. 또한 자바스크립트는 front end와 back end에 모두 사용 가능한 언어이다. 추후 서비스를 제공하고자 할 경우 여러 언어를 사용해야 하는 번거로움을 줄여줄 수 있다.

원체인은 블록체인 프로토콜 핵심 부분의 구현체이다. 기능별로 모듈화함으로써 복잡한 코드를 보다 명료하게 전달하고자 하였다. 이 코드 및 문서에 기초하여 누구나 학습하고 재사용 가능하도록 하였다.

# How to Start
## install packages
<code>npm install</code>
## start
<code>npm start</code>
## set node 2
<code>$env:HTTP_PORT=3002    <p>
$env:P2P_PORT=6002    <p>
$env:PEERS = "ws://localhost:6001"</code>
