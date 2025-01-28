import { motion } from "framer-motion";

const brands = [
  { name: "Honda", logo: "honda.svg" },
  { name: "Jaguar", logo: "jaguar.svg" },
  { name: "Audi", logo: "audi.svg" },
  { name: "Volvo", logo: "volvo.svg" },
  { name: "Nissan", logo: "nissan.svg" },
];

export default function BrandsSlider() {
  return (
    <div className="relative overflow-hidden mt-10">
      <motion.div
        className="flex space-x-16"
        animate={{
          x: [0, -1035],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {/* First set of brands */}
        <div className="flex space-x-16 shrink-0">
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              className="inline-flex items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-36 h-auto" 
              />
            </motion.div>
          ))}
        </div>

        {/* Duplicate set for seamless loop */}
        <div className="flex space-x-16 shrink-0">
          {brands.map((brand) => (
            <motion.div
              key={`${brand.name}-duplicate`}
              className="inline-flex items-center"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="w-36 h-auto" 
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
