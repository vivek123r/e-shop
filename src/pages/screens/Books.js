import { motion } from 'framer-motion';
const Books = () =>{
    return(
      <motion.div
      className="clothes-main"
      initial={{ opacity: 0, y: '100vh' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100vh' }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      <div className='head'>
        <img alt="icon" />
        <h1>Books</h1>
      </div>

    </motion.div>
    );
}
export default Books;