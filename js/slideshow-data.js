(function attachSlideshowData(root, factory) {
    const images = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = images;
        return;
    }

    root.SLIDESHOW_IMAGES = images;
}(typeof globalThis !== 'undefined' ? globalThis : this, function createImages() {
    return Object.freeze([
        // AUTO-INSERT:START
        // PROJECT: Featured portfolio
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/45e1cf379e5fb87d7bc2d20fc72f9b00-uncropped_scaled_within_1536_1152.webp?v=2', alt: 'Bright living room staged with neutral seating and warm wood accents' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/e4cdfb1852e8cac46ab9ed1342641da6-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose living space staged in a calm neutral palette' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/023451b4a5b5ed9f638f6cc5aeb04cb2-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Bay Area home staged for an inviting first impression' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/1a3d4139f916b35965b5fd8a2c47758c-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Contemporary interior staged with balanced furniture placement' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/1c8ea833aadf1720fefad2f512b0554a-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Sunlit room staged with layered textures and natural color' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/280870fdffc41714aafbd6a5931cd3c0-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Open interior staged to highlight flow and usable space' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/739b8fdcf9d254e4774ef95c639f7d8d-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Living area staged with modern furnishings and soft textiles' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/b18ed7ec42a75621d8fe51907d91348e-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Bay Area interior staged with a welcoming conversational layout' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/c542fcaa480e4a5f7b127bc5c7a7d097-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Clean modern room staged with warm neutral details' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/d0712d223a667830d101bca186246547-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Home interior staged to emphasize light and proportion' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/May%2020%20Images/d33c68e66d0b2f03c362685701e20ec7-uncropped_scaled_within_1536_1152.jpg?v=1', alt: 'Finished staging composition with refined neutral furniture' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/New%20Images/6ac7bbb0584d0d60a4e14b7812beffdc-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'Bedroom and bathroom staged with crisp white linens' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/New%20Images/8e509a9f4d3d9797f8fcecdcc90165c8-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'Outdoor patio staged as an inviting entertaining space' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/milpitas-bedroom.webp?v=1', alt: 'Milpitas bedroom staged with a desk and warm natural textures' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/New%20Images/d124aa49f044612d011fa4d029e44092-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'Entryway staged to create a polished arrival' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/New%20Images/e398b9bc2adfd6897451004fdd0f933b-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'Living room staged with neutral seating and organic textures' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/60be9d00045b27b80060e5439c84a6ee.jpg?v=2', alt: 'Bright staged interior with a comfortable seating arrangement' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/9621c92e5be17d2272eaaef9f5ff92b3.jpg?v=2', alt: 'Bedroom staged with a tailored bed and coordinated decor' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/fc50688cdbc7746b474ea73c1da55f18.jpg?v=2', alt: 'Professionally staged home with a bright open layout' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/146_425072528_02.jpg?v=2', alt: 'Beale Street living room staged for city living' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/0bb6523a19d56626eb79e0cab004e52d-cc_ft_768.JPEG?v=2', alt: 'Compact room staged to show scale and function' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/1519ac5a9a229985d9abe71ba80a8a22-cc_ft_1536.JPEG?v=2', alt: 'Spacious Bay Area interior staged in neutral tones' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/92002cb9725089c9187bfbf1cd9ffa80.JPEG?v=2', alt: 'Staged living space with a balanced furniture plan' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/DDining%231.JPEG?v=2', alt: 'Daly City dining room staged for relaxed entertaining' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/DSC_1600.JPEG?v=2', alt: 'Daly City interior staged to highlight natural light' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/Dining%232.JPEG?v=2', alt: 'Danville dining room staged with an elegant table setting' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(3).jpg?v=2', alt: 'Bay Area home staged with clean contemporary furniture' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/File_000(4).jpg?v=2', alt: 'Welcoming staged room with soft neutral finishes' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0186.jpeg?v=2', alt: 'Danville home staged with an open conversational layout' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0189.jpeg?v=2', alt: 'Danville living area staged with layered accessories' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0217.jpeg?v=2', alt: 'Danville room staged to emphasize generous proportions' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0228.JPEG?v=2', alt: 'Danville interior staged with modern neutral furnishings' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/IMG_0255.JPEG?v=2', alt: 'Finished Danville staging with warm decorative accents' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/c4400f978a30a7d247457f6e05cb002a.JPEG?v=2', alt: 'Daly City home staged with a practical room layout' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/ca2620895459e0c9a3b3ba71ff295692.JPEG?v=2', alt: 'Daly City interior staged with light contemporary decor' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/fc50688cdbc7746b474ea73c1da55f18-cc_ft_1536.JPEG?v=2', alt: 'Professionally staged home with crisp modern details' },
        // PROJECT: San Francisco Apartment
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/5a30fb4b7df07254e7d83289c434b716-uncropped_scaled_within_1536_1152.webp', alt: 'San Francisco apartment living room staged for city life' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/971437bbaec69ecc4af1fe6c6944830c-uncropped_scaled_within_1536_1152.webp', alt: 'San Francisco apartment staged with warm neutral furniture' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/979489aface36ae97ee31db8d809b64b-uncropped_scaled_within_1536_1152.webp', alt: 'San Francisco apartment dining area staged for entertaining' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/a5e22a2d56bedfc7d81acb6f89655a33-uncropped_scaled_within_1536_1152.webp', alt: 'San Francisco apartment bedroom staged with soft textiles' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/e836aa731da2c09d22c056cfa985ce31-uncropped_scaled_within_1536_1152.webp', alt: 'San Francisco apartment interior staged to maximize space' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/San%20Francisco%20Apartment/f8506eaf6bcb6b47457c881d8a9ddb51-uncropped_scaled_within_1536_1152.webp', alt: 'Finished San Francisco apartment staging composition' },
        // PROJECT: San Jose Willow Creek Court
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/0d1ed54a3feffaf58b7b84a17858b829-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose living room staged with a calm neutral palette' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/4d5eae3f4a2809f84ba37f589fad6635-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose dining space staged for everyday gathering' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/5a865f1af873ef88d41e9b4eecad33a2-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose bedroom staged with light layered bedding' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/59c3b5f7cb241a2e6cb699ff757de24a-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose home staged to emphasize open sightlines' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/4124e11d0f3881c7beafdf12cba7ed05-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'San Jose interior staged with natural textures' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/March%2027/bd51486953f1335b736352b11042fcff-uncropped_scaled_within_1536_1152.webp?v=1', alt: 'Completed Willow Creek Court home staging' },
        // PROJECT: Milpitas Palmer Street
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/milpitas-dining-room.webp?v=1', alt: 'Milpitas dining room staged with a modern table and garden views' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/milpitas-covered-patio.webp?v=1', alt: 'Milpitas covered patio staged with dining furniture and garden views' },
        { src: 'https://raw.githubusercontent.com/Majdiscode/mom/main/Final%20Images/milpitas-garden-seating.webp?v=1', alt: 'Milpitas garden patio staged with comfortable outdoor seating' },
        // AUTO-INSERT:END
    ]);
}));
