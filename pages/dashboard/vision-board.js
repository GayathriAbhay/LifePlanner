import { useState, useEffect, useRef } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import styles from './vision-board.module.css';

const defaultItems = [
  { id: 1, type: 'quote', content: 'Dream big, work hard, stay focused', author: 'Unknown' },
  { id: 2, type: 'quote', content: 'Your future is created by what you do today', author: 'Unknown' },
];

export default function VisionBoard() {
  const [items, setItems] = useState(defaultItems);
  const [newQuote, setNewQuote] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('view');
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedItems = localStorage.getItem('visionBoardItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('visionBoardItems', JSON.stringify(items));
  }, [items]);

  const handleAddQuote = () => {
    if (!newQuote.trim()) return;

    setItems([...items, {
      id: Date.now(),
      type: 'quote',
      content: newQuote,
      author: newAuthor || 'Unknown',
    }]);

    setNewQuote('');
    setNewAuthor('');
    setActiveTab('view');
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) return;

    setItems([...items, {
      id: Date.now(),
      type: 'image',
      url: imageUrl,
    }]);

    setImageUrl('');
    setActiveTab('view');
  };

  const handleDelete = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setItems([...items, {
        id: Date.now(),
        type: 'image',
        url: e.target.result,
      }]);
      setActiveTab('view');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const quoteItems = items.filter(item => item.type === 'quote');
  const imageItems = items.filter(item => item.type === 'image');

  return (
    <DashboardLayout activeSection="vision-board">
      <div className={styles['vision-board-container']}>
        <div className={styles['page-header']}>
          <div>
            <h1>🖼️ Vision Board</h1>
            <p>Visualize your dream life with images, quotes, and inspiration</p>
          </div>
        </div>

        {/* Tabs */}
        <div className={styles['tabs']}>
          <button
            className={`${styles['tab']} ${activeTab === 'view' ? styles.active : ''}`}
            onClick={() => setActiveTab('view')}
          >
            View Board ({items.length})
          </button>
          <button
            className={`${styles['tab']} ${activeTab === 'add' ? styles.active : ''}`}
            onClick={() => setActiveTab('add')}
          >
            Add Item
          </button>
        </div>

        {/* View Mode */}
        {activeTab === 'view' && (
          <div className={styles['board-section']}>
            {items.length === 0 ? (
              <div className={styles['empty-state']}>
                <p>Your vision board is empty. Start adding images and quotes to visualize your dreams! ✨</p>
              </div>
            ) : (
              <div className={styles['vision-grid']}>
                {items.map(item => (
                  <div key={item.id} className={styles['vision-item']}>
                    {item.type === 'quote' ? (
                      <div className={styles['quote-card']}>
                        <p className={styles['quote-text']}>"{item.content}"</p>
                        <p className={styles['quote-author']}>— {item.author}</p>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={styles['delete-btn']}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className={styles['image-card']}>
                        <img src={item.url} alt="Vision board" className={styles['board-image']} />
                        <button
                          onClick={() => handleDelete(item.id)}
                          className={styles['delete-btn']}
                        >
                          ✕
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {items.length > 0 && (
              <div className={styles['stats']}>
                <p>📸 Images: {imageItems.length}</p>
                <p>💬 Quotes: {quoteItems.length}</p>
              </div>
            )}
          </div>
        )}

        {/* Add Mode */}
        {activeTab === 'add' && (
          <div className={styles['add-section']}>
            <div className={styles['form-card']}>
              <h2>Add a Quote</h2>
              <div className={styles['form-group']}>
                <label>Quote</label>
                <textarea
                  value={newQuote}
                  onChange={(e) => setNewQuote(e.target.value)}
                  placeholder="What's your inspiring quote?"
                  rows={3}
                  className={styles['textarea']}
                />
              </div>

              <div className={styles['form-group']}>
                <label>Author (optional)</label>
                <input
                  type="text"
                  value={newAuthor}
                  onChange={(e) => setNewAuthor(e.target.value)}
                  placeholder="Who said it?"
                  className={styles['input']}
                />
              </div>

              <button onClick={handleAddQuote} className="btn btn-primary btn-lg">
                Add Quote to Board
              </button>
            </div>

            <div className={styles['form-card']}>
              <h2>Add an Image</h2>
              <div className={styles['form-group']}>
                <label>Image URL</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={styles['input']}
                />
              </div>

              {imageUrl && (
                <div className={styles['image-preview']}>
                  <img src={imageUrl} alt="Preview" className={styles['preview-img']} />
                </div>
              )}

              <button onClick={handleAddImage} className="btn btn-primary btn-lg">
                Add Image to Board
              </button>
            </div>

            <div className={styles['form-card']}>
              <h2>Upload from Device</h2>
              <div className={styles['form-group']}>
                <label>Choose Image</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className={styles['file-input']}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="btn btn-primary btn-lg"
                >
                  📁 Select Image from Device
                </button>
              </div>
              <p className={styles['help-text']}>Upload PNG, JPG, GIF, WebP or other image formats from your computer</p>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
