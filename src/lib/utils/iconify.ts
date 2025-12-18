// utils/iconify.ts
export const getColoredIcon = (iconName: string): string => {
  const icons: { [key: string]: string } = {
    // Programming Languages
    'python': 'https://api.iconify.design/devicon/python.svg',
    'javascript': 'https://api.iconify.design/devicon/javascript.svg',
    'typescript': 'https://api.iconify.design/devicon/typescript.svg',
    'java': 'https://api.iconify.design/devicon/java.svg',
    'c++': 'https://api.iconify.design/devicon/cplusplus.svg',
    'c#': 'https://api.iconify.design/devicon/csharp.svg',
    'c': 'https://api.iconify.design/devicon/c.svg',
    
    // Frontend
    'react': 'https://api.iconify.design/devicon/react.svg',
    'next.js': 'https://api.iconify.design/simple-icons/nextdotjs.svg',
    'vue': 'https://api.iconify.design/devicon/vuejs.svg',
    'angular': 'https://api.iconify.design/devicon/angular.svg',
    'html': 'https://api.iconify.design/devicon/html5.svg',
    'css': 'https://api.iconify.design/devicon/css3.svg',
    'sass': 'https://api.iconify.design/devicon/sass.svg',
    'tailwind css': 'https://api.iconify.design/devicon/tailwindcss.svg',
    'framer motion': 'https://api.iconify.design/tabler/brand-framer-motion.svg',
    
    // Backend
    'node.js': 'https://api.iconify.design/devicon/nodejs.svg',
    'express': 'https://api.iconify.design/simple-icons/express.svg',
    'django': '/Skills/logos/django.svg',
    'flask': 'https://api.iconify.design/simple-icons/flask.svg',
    'spring': 'https://api.iconify.design/devicon/spring.svg',
    'FastAPI': 'https://api.iconify.design/devicon/fastapi.svg',
    
    // Databases
    'postgresql': 'https://api.iconify.design/devicon/postgresql.svg',
    'mongodb': 'https://api.iconify.design/devicon/mongodb.svg',
    'mysql': 'https://api.iconify.design/devicon/mysql.svg',
    'redis': 'https://api.iconify.design/devicon/redis.svg',
    'sqlite': 'https://api.iconify.design/devicon/sqlite.svg',
    
    // DevOps & Tools
    'docker': 'https://api.iconify.design/devicon/docker.svg',
    'kubernetes': 'https://api.iconify.design/devicon/kubernetes.svg',
    'git': 'https://api.iconify.design/devicon/git.svg',
    'github': 'https://api.iconify.design/devicon/github.svg',
    'aws': 'https://api.iconify.design/devicon/amazonwebservices.svg',
    'azure': 'https://api.iconify.design/simple-icons/microsoftazure.svg',
    'gcp': 'https://api.iconify.design/simple-icons/googlecloud.svg',
    'jenkins': 'https://api.iconify.design/devicon/jenkins.svg',
    'vs code': 'https://api.iconify.design/devicon/vscode.svg',
    'linux': 'https://api.iconify.design/devicon/linux.svg',

    
    // AI/ML
    'tensorflow': 'https://api.iconify.design/devicon/tensorflow.svg',
    'pytorch': 'https://api.iconify.design/simple-icons/pytorch.svg',
    'pandas': 'https://api.iconify.design/devicon/pandas.svg',
    'numpy': 'https://api.iconify.design/devicon/numpy.svg',
    'scikit-learn': 'https://api.iconify.design/devicon/scikitlearn.svg',
    'opencv': 'https://api.iconify.design/devicon/opencv.svg',
    
    // Data Science
    'jupyter': 'https://api.iconify.design/simple-icons/jupyter.svg',
    'tableau': 'https://api.iconify.design/simple-icons/tableau.svg',
    'powerbi': 'https://api.iconify.design/simple-icons/powerbi.svg',
    
    // Mobile
    'react native': 'https://api.iconify.design/simple-icons/react.svg',
    'flutter': 'https://api.iconify.design/simple-icons/flutter.svg',
    'android': 'https://api.iconify.design/devicon/android.svg',
    'ios': 'https://api.iconify.design/simple-icons/ios.svg',

    //Graphic Design
    'adobe photoshop': 'https://api.iconify.design/devicon/photoshop.svg',
    'adobe illustrator': 'https://api.iconify.design/devicon/illustrator.svg',
    'figma': 'https://api.iconify.design/devicon/figma.svg',
    'canva': 'https://api.iconify.design/devicon/canva.svg',
    //video Editing
    'adobe premiere pro': 'https://api.iconify.design/devicon/premierepro.svg',
    'adobe after effect': 'https://api.iconify.design/devicon/aftereffects.svg',
    'davinci resolve': 'https://api.iconify.design/simple-icons/davinciresolve.svg',
    //not found as iconify icons
    'machine learning': '/Skills/logos/brain.svg',
    'data science': '/Skills/logos/data-science.svg',
    'deep learning': '/Skills/logos/deep-learning.svg',
    'natural language processing': '/Skills/logos/nlp.svg',
    'computer vision': '/Skills/logos/vision.svg',
  };
  
  // Try exact match first, then try lowercase
  return icons[iconName] || icons[iconName.toLowerCase()] || '';
};

