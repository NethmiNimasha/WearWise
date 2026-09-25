@Repository
public interface ClothingRepository
        extends JpaRepository<Clothing, Long> {

    List<Clothing> findByUserId(Long userId);
}