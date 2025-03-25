#!/bin/bash
echo "If this doesn't work, do: git reset --hard; cd foam3; git reset --hard"
echo "Good luck!"

find ./ -type f \( \
     -name "*.js"   -o \
     -name "*.java" -o \
     -name "*.jrl"  -o \
     -name "*.fbe"  -o \
     -name "*.sh"   -o \
     -name "*.flow" -o \
     -name "*.txt"  -o \
     -name "*.html" -o \
     -name "*.md" \) \
   -exec perl -p -i -e 's/foam\.core/foam\.lang/g'   \{} \; \
   -exec perl -p -i -e 's/foam\/core/foam\/lang/g'   \{} \; \
   -exec perl -p -i -e 's/NanoService/COREService/g' \{} \; \
   -exec perl -p -i -e 's/nSpec/cSpec/g'             \{} \; \
   -exec perl -p -i -e 's/NSpec/CSpec/g'             \{} \; \
   -exec perl -p -i -e 's/JDBCConnectiocSpec/JDBCConnectionSpec/g' \{} \; \
   -exec perl -p -i -e 's/nanos/core/g'              \{} \; \
   -exec perl -p -i -e 's/NANOS/CORE/g'              \{} \;

cd foam3/src/foam
git mv core  lang
git mv nanos core

cd core
git mv NanoService.js COREService.js
git mv box/NanoServiceRouter.java box/COREServiceRouter.java

cd boot
git mv NSpec.js          CSpec.js
git mv NSpecAware.js     CSpecAware.js
git mv NSpecFactory.java CSpecFactory.java
git mv DAONSpecMenu.js   DAOCSpecMenu.js
